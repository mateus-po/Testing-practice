const puppeteer = require('puppeteer');


let browser, page;

beforeAll(async () => {
  browser = await puppeteer.launch({headless:false});
  page = await browser.newPage();
  await page.goto('http://uitestingplayground.com/sampleapp', {waituntil: 'domcontentloaded'}); })

async function form_fill(login, password) {
  await page.focus('input[name="UserName"]');
  await page.keyboard.type(login);
  await page.focus('input[name="Password"]');
  await page.keyboard.type(password);
  await page.click("#login");
}

async function get_loginstatusHTML() {
  return await page.evaluate(() => {
    return document.getElementById("loginstatus").innerHTML;
  });
}
 
let test_id = 1;
describe("Standard succesful/unsuccessful login/logout tests", () => {



test(`${test_id++}. Successful log-in`,
async () =>  {
  await form_fill("correct_login", "pwd");
  expect(await get_loginstatusHTML()).toEqual("Welcome, correct_login!");
});

test(`${test_id++}. Successful log-out`, 
async () => {
  await page.click("#login")
  expect(await get_loginstatusHTML()).toEqual("User logged out.");
});

test(`${test_id++}. Successful log-in, log-out, and log-in again`,
async () => {
  await page.goto('http://uitestingplayground.com/sampleapp', {waituntil: 'domcontentloaded'});
  await form_fill("correct_login", "pwd");
  expect(await get_loginstatusHTML()).toEqual("Welcome, correct_login!");
  await page.click("#login");
  expect(await get_loginstatusHTML()).toEqual("User logged out.");
  await form_fill("correct_login", "pwd");
  expect(await get_loginstatusHTML()).toEqual("Welcome, correct_login!");

})

test(`${test_id++}. Unsuccessful log-in (empty login)`,
async () => {
  await page.goto('http://uitestingplayground.com/sampleapp', {waituntil: 'domcontentloaded'});
  await form_fill("", "pwd");
  expect(await get_loginstatusHTML()).toEqual("Invalid username/password");
});

test(`${test_id++}. Unsuccessful log-in (empty login, empty password)`,
async () => {
  await page.goto('http://uitestingplayground.com/sampleapp', {waituntil: 'domcontentloaded'});
  await page.click("#login");
  expect(await get_loginstatusHTML()).toEqual("Invalid username/password");
});

test(`${test_id++}. Unsuccessful log-in (wrong password)`,
async () => {
  await page.goto('http://uitestingplayground.com/sampleapp', {waituntil: 'domcontentloaded'});
  await form_fill("correct_login", "wrong_password");
  expect(await get_loginstatusHTML()).toEqual("Invalid username/password");
})
})

describe("Tests that check standard interface features", () => {
  test(`${test_id++}. Navigating form elements with a mouse, typing with keyboard`, 
  async () => {
    await page.goto('http://uitestingplayground.com/sampleapp', {waituntil: 'domcontentloaded'});
    await page.click('input[name="UserName"]');
    await page.keyboard.type("typing...");
    const loginInputContent = await page.evaluate(() => {
      return document.getElementsByName("UserName")[0].value;
    })
    
    expect(loginInputContent).toEqual("typing...");

    await page.click('input[name=Password]');
    await page.keyboard.type("pwd");

    const passwordInputContent = await page.evaluate(() => {
      return document.getElementsByName('Password')[0].value;
    });
    expect(passwordInputContent).toEqual("pwd");
    await page.click("#login");
    expect(await get_loginstatusHTML()).toEqual("Welcome, typing...!");

  });

  test(`${test_id++}. Navigating form elements using Tab and Enter keyboard keys`, 
  async () => {
    await page.goto('http://uitestingplayground.com/sampleapp', {waituntil: 'domcontentloaded'});
    await page.click('input[name="UserName"]');
    await page.keyboard.type("typing...");
    await page.keyboard.press("Tab");
    let currentElementId = await page.evaluate(() => document.activeElement.id);
    const passwordInputId = await page.evaluate(() => document.getElementsByName("Password")[0].id)
    expect(currentElementId).toEqual(passwordInputId);
    await page.keyboard.type("pwd");
    await page.keyboard.press("Tab");
    currentElementId = await page.evaluate(() => document.activeElement.id);
    expect(currentElementId).toEqual("login");
    await page.keyboard.press("Enter");
    expect(await get_loginstatusHTML()).toEqual("Welcome, typing...!")


  })

  test(`${test_id++}. Submitting form via 'Enter' while in input field`, 
  async ()  => {
    await page.goto('http://uitestingplayground.com/sampleapp', {waituntil: 'domcontentloaded'});
    await page.focus('input[name="UserName"]');
    await page.type("correct_login");
    await page.focus('input[name="Password"]');
    await page.type("pwd");
    await page.keyboard.press("Enter");
    expect(get_loginstatusHTML()).toEqual("Welcome, correrc-login!");
  })

})


afterAll(async () => {
  browser.close();
})


