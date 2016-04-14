import '/imports/jsExtensions.js'
import {Component} from 'react'
import {njsx, div, i} from '/client/reactNJSX.js'
import Alert from '/imports/model/Alert.js'
import TransitionGroup from 'react-addons-css-transition-group'

const transitionGroup = njsx(TransitionGroup)

const ALERT_DELAY = 500

class AlertPanel extends Component {

	constructor(props, context) {
    super(props, context)

    this.state = {
      alerts: [],
      pendingAlerts: [],
      currentAlert: null
    }
  }

	componentDidMount() {
		this.alertBinding = Alert.raised.add(alert =>
			this.setState({pendingAlerts: [...this.state.pendingAlerts, alert]})
		)
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(!nextState.pendingAlerts.empty() && !nextState.currentAlert) {
			nextState.currentAlert = nextState.pendingAlerts.shift()
			nextState.alerts = [...nextState.alerts, nextState.currentAlert]

			setTimeout(() => {
				this.setState({ currentAlert: null })
			}, ALERT_DELAY)
		}

		return !this.state.alerts.equals(nextState.alerts)
	}

	componentWillUnmount() {
		this.alertBinding.detach()
	}

	closeAlert(alert) {
		const alerts = this.state.alerts.filter(a => a != alert)
		this.setState({alerts})
	}

	render() {
		return div('.alertPanel')(
			transitionGroup({
				transitionName: 'alert',
				transitionEnterTimeout: 5000,
				transitionLeaveTimeout: 5000
			})(
				this.state.alerts.map(alert =>
					div(`.alert.${alert.type}`)(
						i(`.${alert.type}`),
						alert.message,
						i('.close')({onClick: () => this.closeAlert(alert)})
					)
				)
			)
		)()
	}

}

export default njsx(AlertPanel)