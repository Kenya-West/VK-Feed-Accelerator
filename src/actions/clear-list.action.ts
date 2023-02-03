import { log } from "../decorators/log.decorator";
import { ElementCollection } from "../element-find/element-collection";
import { ElementFind } from "../element-find/element-find";
import { ActionAbstract } from "./action-abstract.action";

const FEED_COUNTER = 30;

export class ClearListActionSwitch implements ActionAbstract {
    private static timer: NodeJS.Timer | null = null;

    public run(payload?: unknown): void {
        ClearListActionSwitch.switchValues();
    }
    
    private static getValue(): boolean {
        return localStorage.getItem("vk-feed-accelerator-clear-list") === "true" ? true : false;
    }
    private static setValue(value: boolean): boolean {
        const elem = new ElementFind().getElementByElementIdSingle(ElementCollection.PageBlockCustomUiToggler);
        if (value === true) {
            if (elem.classList.contains("off")) elem.classList.remove("off");
            elem.classList.add("on");
            ClearListActionSwitch.clearFeed();
            ClearListActionSwitch.timerLaunch();
        } else {
            if (elem.classList.contains("on")) elem.classList.remove("on");
            elem.classList.add("off");
            ClearListActionSwitch.timerStop();
        }
        localStorage.setItem("vk-feed-accelerator-clear-list", value.toString());
        return localStorage.getItem("vk-feed-accelerator-clear-list") === "true" ? true : false;
    }
    private static switchValues(): boolean {
        ClearListActionSwitch.setValue(!ClearListActionSwitch.getValue());
        return localStorage.getItem("vk-feed-accelerator-clear-list") === "true" ? true : false;
    }

    public static initState(value: string | null): void {
        if (value === null) {
            ClearListActionSwitch.setValue(false);
        } else {
            const elem = new ElementFind().getElementByElementIdSingle(ElementCollection.PageBlockCustomUiToggler);
            if (!elem.classList.contains("on") && !elem.classList.contains("off")) {
                ClearListActionSwitch.setValue(value === "true"? true : false);
            }
        }
    }

    @log("Запущен метод clearFeed()")
    public static clearFeed(): void {
        if (ClearListActionSwitch.getValue()) {
            const elems = new ElementFind().getElementByElementIdMultiple(ElementCollection.FeedItems);
            elems.forEach((feedRow, i) => { if (i < elems.length - FEED_COUNTER) feedRow.remove() });
        }
    }

    private static timerLaunch(): void {
        if (ClearListActionSwitch.timer === null) {
            ClearListActionSwitch.timer = setInterval(ClearListActionSwitch.clearFeed, 30000);
        }
    }
    private static timerStop(): void {
        if (ClearListActionSwitch.timer) {
            clearInterval(ClearListActionSwitch.timer);
            ClearListActionSwitch.timer = null;
        };
    }

}