import React from "react";
import { Card, Segment, Dimmer, Loader } from "semantic-ui-react";

const SemanticLoader = () =>
  <Dimmer as={Segment} active inverted>
    <Loader size="massive">Loading</Loader>
  </Dimmer>;

export default SemanticLoader;
