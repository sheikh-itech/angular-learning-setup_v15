import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tab } from '../tab/tab';

@Component({
    selector: 'tab-container',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tab-container.html',
    styleUrls: ['./tab-container.css']
})
export class TabContainer implements AfterContentInit {

    @ContentChildren(Tab) tabs!: QueryList<Tab>;

    ngAfterContentInit() {
        // Activate the first tab by default
        if (this.tabs.length > 0) {
            this.tabs.first.active = true;
        }
    }

    selectTab(tab: Tab) {
        this.tabs.forEach(t => t.active = false);
        tab.active = true;
    }
}
