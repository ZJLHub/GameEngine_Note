export default class L3D extends Laya.Handler{
	static onclick(listener:Laya.EventDispatcher, ths:any, handler:(ev?:Laya.Event)=>void){
		listener.on(Laya.Event.CLICK, ths, handler);
	}
	static offclick(listener: Laya.EventDispatcher, ths: any, handler: (ev?: Laya.Event) => void) {
		listener.off(Laya.Event.CLICK, ths, handler);
	}
	static ondown(listener: Laya.EventDispatcher, ths: any, handler: (ev?: Laya.Event) => void) {
		listener.on(Laya.Event.MOUSE_DOWN, ths, handler);
	}
	static offdown(listener: Laya.EventDispatcher, ths: any, handler: (ev?: Laya.Event) => void) {
		listener.off(Laya.Event.MOUSE_DOWN, ths, handler);
	}
	static onmove(listener: Laya.EventDispatcher, ths:any, handler: (ev?: Laya.Event) => void,args?:any[]) {
		listener.on(Laya.Event.MOUSE_MOVE, ths, handler, args);
	}
	static offmove(listener: Laya.EventDispatcher, ths:any, handler: (ev?: Laya.Event) => void) {
		listener.off(Laya.Event.MOUSE_MOVE, ths, handler);
	}
	static onup(listener: Laya.EventDispatcher, ths:any, handler: (ev?: Laya.Event) => void) {
		listener.on(Laya.Event.MOUSE_UP, ths, handler);
	}
	static offup(listener: Laya.EventDispatcher, ths: any, handler: (ev?: Laya.Event) => void) {
		listener.off(Laya.Event.MOUSE_UP, ths, handler);
	}
	
	static createloop(caller:any,method:Function,args?:any[]){
		return L3D.create(caller,method,args,false);
	}
	
}