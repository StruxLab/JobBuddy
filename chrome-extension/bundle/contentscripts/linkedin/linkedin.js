(async () => {
  await Models.InitializeApp();
  Models.location = { ...window.location };

  // Initialize the Application
  console.log('initial: ', window.location);

  Models.Observers.watchForPageChange();

  // interactive
  // Routes
  // /jobs/
  // General Jobs

  // /jobs/search/* ?currentJobId={id}
  // /jobs/search/*
  // window.addEventListener('viewchange', Models.handleRouteChange);
})();
