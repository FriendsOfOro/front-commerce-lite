import React from "react";
import HomeQuery from "./HomeQuery.gql";
import EnhanceHome from "./EnhanceHome";
import ProductList from "theme/modules/ProductList";
import HomeBanner from "theme/modules/HomeBanner";
import LoadingArea from "theme/components/molecules/LoadingArea";
import Loading from "theme/components/atoms/Loading";
import Page from "theme/components/templates/Page";

const Home = ({ store, category, loading }) => (
  <Page>
    <HomeBanner storeName={store && store.name} />
    {loading ? (
      <LoadingArea>
        <Loading />
      </LoadingArea>
    ) : (
      <ProductList products={category.layer.products} />
    )}
  </Page>
);

export default EnhanceHome(HomeQuery)(Home);
