(async () => {
  // Initialize the Application
  await Models.InitializeApp();
  await Models.Observers.waitForNavMenu();

  console.log('Initial page: ', Models.location);
  Models.Router();
  Models.Observers.watchForPageChange();
})();
