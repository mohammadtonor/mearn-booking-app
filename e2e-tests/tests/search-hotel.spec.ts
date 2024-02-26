import {test, expect} from '@playwright/test';
 
const UI_URL = 'http://localhost:5173/';

test.beforeEach( async ({ page }) => {
    await page.goto(UI_URL);

  //go to sign in button 
  await page.getByRole('link', { name: 'Sign In'}).click();
  
  await expect(page.getByRole('heading', { name: 'Sign In'})).toBeVisible();
  
  await page.locator("[name=email]").fill("test2@example.com");
  await page.locator("[name=password]").fill("123456");
  
  await page.getByRole("button", { name: "Login"}).click();
  
  await expect(page.getByText("Sign in Successful!")).toBeVisible();
  
});

test("Should show hotel search result", async ({ page }) => {
    await page.goto(UI_URL);

    await page.getByPlaceholder("Where are you going?").fill("Tehran");
    await page.getByRole("button", { name: "Search"}).click();

    await expect(page.getByText("Hotels Found in Tehran")).toBeVisible();
    await expect(page.getByText("Homa Tehran")).toBeVisible();
 
})

test("should show hotel detail", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Tehran");
  await page.getByRole("button", { name: "Search"}).click();
  
  await page.getByText("Homa Tehran").click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", { name: "Book Now"})).toBeVisible()
})