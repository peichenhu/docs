import { initMixin } from './initMixin.mjs';

function Vue(options) {
	this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

initGlobalAPI(Vue);

export default Vue;
