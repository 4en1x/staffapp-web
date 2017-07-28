import React from "react";
import { Dimmer, Loader, Header, Card, Image } from "semantic-ui-react";
import images from "../../assets/images";

const InvertedLoader = () =>
  <div className="interview-component">
    <Header dividing as="h2" className="custom-header">
      Technical interview
    </Header>

    <Card fluid>
      <Dimmer active inverted>
        <Loader size="massive" inverted>
          Loading
        </Loader>
      </Dimmer>;
      <Image src={images.interviewBackground} />
    </Card>
  </div>;

export default InvertedLoader;
