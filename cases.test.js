const puppeteer = require('puppeteer');


let browser, page;



beforeAll(async () => {
  browser = await puppeteer.launch({headless:false});
  page = await browser.newPage();
  await page.goto('http://uitestingplayground.com/sampleapp', {waituntil: 'domcontentloaded'}); })


async function form_fill(login, password) {
  // helper function
  // types given login and password to corresponding input fields
  // then clicks login button

  await page.focus('input[name="UserName"]');
  await page.keyboard.type(login);

  await page.focus('input[name="Password"]');
  await page.keyboard.type(password);

  await page.click("#login");
}

async function get_loginstatusHTML() {
  // helper function
  return await page.evaluate(() => {
    return document.getElementById("loginstatus").innerHTML;
  });
}
 
let test_id = 1; // helper variable, test numeration



describe("Standard succesful/unsuccessful login/logout tests", () => {

  test(`${test_id++}. Successful log-in`,
  async () =>  {
    await form_fill("correct_login", "pwd");

    expect(await get_loginstatusHTML())
      .toEqual("Welcome, correct_login!");
  });

  test(`${test_id++}. Successful log-out`, 
  async () => {
    await page.click("#login")

    expect(await get_loginstatusHTML())
      .toEqual("User logged out.");
  });

  test(`${test_id++}. Successful log-in, log-out, and log-in again`,
  async () => {
    await page.reload({waituntil: 'domcontentloaded'});

    await form_fill("correct_login", "pwd");
    expect(await get_loginstatusHTML())
      .toEqual("Welcome, correct_login!");

    await page.click("#login");
    expect(await get_loginstatusHTML())
      .toEqual("User logged out.");

    await form_fill("correct_login", "pwd");
    expect(await get_loginstatusHTML())
      .toEqual("Welcome, correct_login!");

  })

  test(`${test_id++}. Unsuccessful log-in (wrong password)`,
  async () => {
    await page.reload({waituntil: 'domcontentloaded'});

    await form_fill("correct_login", "incorrect_password");
    expect(await get_loginstatusHTML())
      .toEqual("Invalid username/password");
  });

  test(`${test_id++}. Unsuccessful log-in (empty login)`,
  async () => {
    await page.reload({waituntil: 'domcontentloaded'});

    await form_fill("", "pwd");
    expect(await get_loginstatusHTML())
      .toEqual("Invalid username/password");
  });

  test(`${test_id++}. Unsuccessful log-in (empty login, empty password)`,
  async () => {
    await page.reload({waituntil: 'domcontentloaded'});

    await page.click("#login");
    expect(await get_loginstatusHTML())
      .toEqual("Invalid username/password");
  });

  test(`${test_id++}. Site keeps session after reloading the page`,
  async () => {
    await page.reload({waituntil: 'domcontentloaded'});

    await form_fill("correct_login", "pwd");
    await page.reload({waituntil: 'domcontentloaded'});

    expect(await get_loginstatusHTML())
      .toEqual("Welcome, correct_login!");
  })

})

describe("Tests that check standard interface features", () => {

  test(`${test_id++}. Password field obscures the text`,
  async () => {
    await page.reload({waituntil: 'domcontentloaded'});

    const pwdInputType = await page.evaluate(() => {
      return document.getElementsByName("Password")[0].type;
    });
    // chcecking if the type of password input is "password"
    // is equivalent to checking if text inside is obscured 
    expect(pwdInputType)
      .toEqual("password");
  })

  
  test(`${test_id++}. Login field does allow coping`,
  async () => {
    await page.reload({waituntil: 'domcontentloaded'});

    // first typing in the login input "pwd"
    await page.focus('input[name="UserName"]');
    await page.keyboard.type("pwd");

    // Copying from login input by Ctrl + a, Ctrl + c
    await page.keyboard.down('ControlLeft')
    await page.keyboard.press('KeyA')
    await page.keyboard.press('KeyC');
    await page.keyboard.up('ControlLeft')

    // Pasting into password input by Ctrl + v
    await page.focus('input[name="Password"]');
    await page.keyboard.down('ControlLeft')
    await page.keyboard.press('KeyV');
    await page.keyboard.up('ControlLeft')

    await page.click("#login");

    expect(await get_loginstatusHTML())
      .toEqual("Welcome, pwd!");
  })

  test(`${test_id++}. Password field does not allow coping`,
  async () => {
    await page.reload({waituntil: 'domcontentloaded'});

    // Typing into login input "notpwd"
    await page.focus('input[name="UserName"]');
    await page.keyboard.type("notpwd")

    // Cuting the "notpwd" from login input by Ctrl + a, Ctrl + x
    // Thanks to that, there is "notpwd" in clipboard
    await page.keyboard.down('ControlLeft')
    await page.keyboard.press('KeyA')
    await page.keyboard.press('KeyX');
    await page.keyboard.up('ControlLeft')

    // typing in "pwd" the password input
    await page.focus('input[name="Password"]');
    await page.keyboard.type("pwd");

    // Attempting to copy password from the password input by Ctrl + a, Ctrl + c
    // This shouldn't succeed, so there should still be "notpwd" in the clipboard 
    await page.keyboard.down('ControlLeft')
    await page.keyboard.press('KeyA')
    await page.keyboard.press('KeyC');
    await page.keyboard.up('ControlLeft')

    // pasting the clipboard content into login input
    await page.focus('input[name="UserName"]');
    await page.keyboard.down('ControlLeft')
    await page.keyboard.press('KeyV');
    await page.keyboard.up('ControlLeft')

    await page.click("#login");
    //if it will login as notpwd, it will mean that it couldn't copy from password input
    expect(await get_loginstatusHTML())
      .toEqual("Welcome, notpwd!");
  })


  test(`${test_id++}. When opening the page, cursor is in login field by default`, 
  async () => {
    await page.reload({waituntil: 'domcontentloaded'});

    await page.keyboard.type("this text should be typed in login input");

    expect(await page.evaluate(() => document.getElementsByName("UserName")[0].value))
      .not.toEqual("");

  });

  test(`${test_id++}. Navigating form elements with a mouse, typing with keyboard`, 
  async () => {
    await page.reload({waituntil: 'domcontentloaded'});

    await page.click('input[name="UserName"]');
    await page.keyboard.type("typing...");

    // getting the value of the login input after clicking on it, and then typing something
    const loginInputContent = await page.evaluate(() => {
      return document.getElementsByName("UserName")[0].value;
    })
    
    expect(loginInputContent)
      .toEqual("typing...");

    await page.click('input[name=Password]');
    await page.keyboard.type("pwd");

    // getting the value of the password input after clicking on it, and then typing something
    const passwordInputContent = await page.evaluate(() => {
      return document.getElementsByName('Password')[0].value;
    });

    expect(passwordInputContent)
      .toEqual("pwd");

    await page.click("#login");
    expect(await get_loginstatusHTML())
      .toEqual("Welcome, typing...!");

  });

  test(`${test_id++}. Navigating form elements using Tab and Enter keyboard keys`, 
  async () => {
    await page.reload({waituntil: 'domcontentloaded'});

    // first we click on the login input
    await page.click('input[name="UserName"]');
    await page.keyboard.type("typing...");

    await page.keyboard.press("Tab");

    //checking if the password input is the currently active element 
    let currentElementId = await page.evaluate(() => document.activeElement.id);
    const passwordInputId = await page.evaluate(() => document.getElementsByName("Password")[0].id)

    expect(currentElementId)
      .toEqual(passwordInputId);

    await page.keyboard.type("pwd");

    await page.keyboard.press("Tab");

    //checking if the login button is the currently active element 
    currentElementId = await page.evaluate(() => document.activeElement.id);

    expect(currentElementId)
      .toEqual("login");

    //checking if clicking "enter" while button is focused will log the user in
    await page.keyboard.press("Enter");
    expect(await get_loginstatusHTML())
      .toEqual("Welcome, typing...!")


  })

  test(`${test_id++}. Submitting form via 'Enter' while in input field`, 
  async ()  => {
    await page.reload({waituntil: 'domcontentloaded'});

    // filling the login and password inputs
    await page.focus('input[name="UserName"]');
    await page.keyboard.type("correct_login");
    await page.focus('input[name="Password"]');
    await page.keyboard.type("pwd");

    // pressing "enter" while button is not the currenctly active element
    await page.keyboard.press("Enter");
    expect(await get_loginstatusHTML())
      .toEqual("Welcome, correrct-login!");
  })

})

describe("Tests that check UI vulnerabilities", () => {
  test(`${test_id++}. Site is protected against XSS attacks`,
  async () => {
    await page.reload({waituntil: 'domcontentloaded'});

    // login is some html code
    const maliciousLogin = '<img src="https://pbs.twimg.com/media/FOQpWYPXoAEno8Z.jpg">';

    const tagsToReplace = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;'
    }

    // displayed login should have all special characters replaced with their HTML codes
    const pacifiedLogin = maliciousLogin.replace(/[&<>]/g, (tag) => tagsToReplace[tag] || tag);

    await form_fill(maliciousLogin, "pwd");

    expect(await get_loginstatusHTML())
      .toEqual(`Welcome, ${pacifiedLogin}!`);
  })

})


afterAll(async () => {
  browser.close();
})


