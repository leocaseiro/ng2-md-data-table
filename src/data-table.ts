import {
    Component,
    Input,
    Output,
    EventEmitter,
    ContentChild,
    ContentChildren,
    QueryList,
    AfterContentInit,
    OnDestroy
} from '@angular/core';
import 'rxjs/add/operator/share';
import { map } from 'rxjs/operator/map';
import {
    Ng2MdDataTableHeaderSelectableRow,
    Ng2MdDataTableSelectableRow,
    INg2TableSelectableRowSelectionChange
} from './data-table-selectable-tr';
export * from './data-table-selectable-tr';

/**
 * Selectable change event data
 */
export interface INg2TableSelectionChange {
    name: string;
    allSelected: boolean;
    values: any[];
}

@Component({
    selector: 'ng2-md-data-table',
    template: `<ng-content></ng-content>`,
    styleUrls: ['data-table.css'],
    host: {
        '[class.ng2-md-data-table]': 'true',
        '[class.ng2-md-data-table-selectable]': 'selectable',
    }
})
export class Ng2MdDataTable implements AfterContentInit, OnDestroy {
    @Input()
    selectable: boolean;
    @Output()
    onSelectableAll: EventEmitter<any> = new EventEmitter(false);
    @Output()
    onSelectableChange: EventEmitter<any> = new EventEmitter(false);

    @ContentChild(Ng2MdDataTableHeaderSelectableRow)
    _masterRow: Ng2MdDataTableHeaderSelectableRow;

    @ContentChildren(Ng2MdDataTableSelectableRow, true)
    _rows: QueryList<Ng2MdDataTableSelectableRow>;

    _listeners: EventEmitter<any>[] = [];

    selected: Array<string> = [];

    constructor() {
        (this.onSelectableChange as any).share();
    }

    change(event: INg2TableSelectableRowSelectionChange) {
        let outputEvent: INg2TableSelectionChange = {
            name: 'selectable_change',
            allSelected: false,
            values: []
        };
        if (event.target instanceof Ng2MdDataTableHeaderSelectableRow === true) {
            if (event.isActive === true) {
                outputEvent.allSelected = true;
                outputEvent.values = this._getRowsValues();
            }
        } else {
            outputEvent.values = this.selected.slice(0);

            if (event.isActive === true) {
                outputEvent.values.push(event.selectableValue);
            } else {
                let index = outputEvent.values.indexOf(event.selectableValue);
                if (index !== -1) {
                    outputEvent.values.splice(index, 1);
                }
            }
        }

        // dispatch change
        this.selected = outputEvent.values;
        this.onSelectableChange.emit(outputEvent);
    }

    /**
     * @returns {Array<string>}
     */
    _getRowsValues(): any[] {
        return this._rows.toArray()
            .map((tr: Ng2MdDataTableSelectableRow) => tr.selectableValue);
    }

    _unsubscribeChildren() {
        this.selected = [];
        if (this._listeners.length) {
            this._listeners.forEach(listener => {
                listener.unsubscribe();
            });
            this._listeners = [];
        }
    }

    _updateChildrenListener(list: QueryList<Ng2MdDataTableSelectableRow>) {
        this._unsubscribeChildren();

        list.toArray()
            .map((tr: Ng2MdDataTableSelectableRow) => {
                tr.onChange.subscribe(this.change.bind(this));
            });
    }

    ngAfterContentInit() {
        if (this.selectable === true) {
            if (!!this._masterRow) {
                this._masterRow.onChange.subscribe(this.change.bind(this));
            }

            this._rows.changes.subscribe(this._updateChildrenListener.bind(this));
            this._updateChildrenListener(this._rows);
        }
    }

    ngOnDestroy() {
        this._unsubscribeChildren();
    }

}
