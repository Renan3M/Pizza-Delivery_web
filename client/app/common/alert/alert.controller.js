
let $timeout;

class AlertController {

  constructor(_timeout) {
  	$timeout = _timeout
    this.isAlertHidden = true;
  }

  $onChanges (changedObjs) {
  	if (changedObjs.message && changedObjs.message.currentValue && this.message.text && this.message.type) {
  		this.message.timeout = this.message.timeout || 2000;
  		this.isAlertHidden = false;
  		$timeout( () => {
  			delete this.message;
  			this.isAlertHidden = true;
  		}, this.message.timeout);
  	}
  }
}

AlertController.$inject = ['$timeout'];

export default AlertController;
