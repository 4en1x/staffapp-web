import React from "react";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";
import images from "../../assets/images";

const SemanticLoader = () =>
  <div className="semanctic-loader">
    <Segment>
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
      <Image src={images.loaderBackground} />
    </Segment>
  </div>;

export default SemanticLoader;
