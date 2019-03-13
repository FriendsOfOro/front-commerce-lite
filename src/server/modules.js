import StoreInformation from "./modules/store-information";

export default [
  // In a real Front-Commerce application you could load core modules
  // on demand right here, and select the parts you need for your current
  // project.
  // This is where you could combine several core datasources to build
  // the project that match your needs and run away from a monolithic
  // architecture when it is not relevant

  StoreInformation,
  process.env.FEATURE_FAKE_LOCAL_SHOP_ENABLE
    ? require("./modules/fake-shop").default
    : undefined,
  process.env.FEATURE_MOLTIN_INTEGRATION_ENABLE
    ? require("./modules/moltin-integration").default
    : undefined
].filter(Boolean); // only keep the enabled ones
