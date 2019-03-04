import React from "react";
import PropTypes from "prop-types";
import { H2 } from "theme/components/atoms/Typography/Heading";
import Paragraph from "theme/components/atoms/Typography/Paragraph";
import Link from "theme/components/atoms/Typography/Link";

const StoreDetails = ({ owner }) => (
  <div>
    <H2>Your contact today: {owner.displayName}</H2>
    <img src={owner.picture} alt={owner.displayName} />
    <Paragraph>
      Email:{" "}
      <Link to={`mailto:${owner.email}`} external type="reversed">
        {owner.email}
      </Link>
    </Paragraph>
  </div>
);

StoreDetails.propTypes = {
  owner: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    picture: PropTypes.string
  })
};

export default StoreDetails;
