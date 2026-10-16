from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()

try:
    driver.get("https://www.selenium.dev/selenium/web/web-form.html")

    # Check page title
    assert "Web form" in driver.title
    print("PASS: Page title is correct")

    # Enter text and submit
    textbox = driver.find_element(By.NAME, "my-text")
    textbox.send_keys("Hello Selenium")

    driver.find_element(By.TAG_NAME, "button").click()

    # Verify result
    message = driver.find_element(By.ID, "message")
    assert message.text == "Received!"

    print("PASS: Form submission works")

finally:
    driver.quit()