import React from 'react';
import ParticleEffectButton from 'react-particle-effect-button';
import Ripples from 'react-ripples'
class UDButtonParticle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hidden: false
    }
  }

  componentWillMount() {
    this.pubSubToken = PubSub.subscribe(this.props.id, this.onIncomingEvent.bind(this));
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.pubSubToken);
  }

  onIncomingEvent(eventName, event) {
    if (event.type === "requestState") {
      var data = {
        attributes: {
          hidden: this.state.hidden,
        }
      }
      UniversalDashboard.post(`/api/internal/component/element/sessionState/${event.requestId}`, data);
    }
    else if (event.type === "setState") {
      this.setState(event.state.attributes);
    }
    else if (event.type === "removeElement") {
      this.setState({
        hidden: true
      });
    }
  }

  handleClick = () => {
    UniversalDashboard.publish("element-event", {
      type: "clientEvent",
      eventId: this.props.id + "onClick",
      eventName: "onClick",
      eventData: ""
    });
  };


  render() {
    return (
      <ParticleEffectButton
        color={this.props.color}
        hidden={this.state.hidden}
        id={this.props.id}
        duration={this.props.duration}
        style={this.props.style}
        direction={this.props.direction}
        canvasPadding={this.props.canvasPadding}
        particlesAmountCoefficient={this.props.particlesAmountCoefficient}
        oscillationCoefficient={this.props.oscillationCoefficient}
      >
        <Ripples>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleClick.bind(this)}
          >
            {this.props.text}
          </button>
        </Ripples>
      </ParticleEffectButton>
    )

  }
}

export default UDButtonParticle
