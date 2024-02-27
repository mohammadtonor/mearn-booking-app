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
});


test("should book hotel", async ({ page }) => {
  await page.goto(UI_URL);
  
  await page.getByPlaceholder("Where are you going?").fill("Tehran");

  const date = new Date();
  date.setDate(date.getDate() + 3);
  const formatDate = date.toISOString().split("T")[0];
  await page.getByPlaceholder("Check out Date").fill(formatDate);

  await page.getByRole("button", { name: "Search"}).click();
  
  await page.getByText("Homa Tehran").click();
  await page.getByRole("button", { name: "Book Now"}).click();

  await expect(page.getByText("Total Cost: $300.00")).toBeVisible();

  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame.locator('[placeholder="Card number"]').fill("4242424242424242");
  await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/30");
  await stripeFrame.locator('[placeholder="CVC"]').fill("242");
  await stripeFrame.locator('[placeholder="ZIP"]').fill("24225");

  await page.getByRole("button", {name: "Confirm Booking"}).click();
  await expect(page.getByText("Booking Saved!")).toBeVisible();
})