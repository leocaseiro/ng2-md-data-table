import {
    Component,
    Output,
    Input,
    EventEmitter,
    Inject,
    Optional,
    forwardRef,
    ElementRef,
    AfterContentInit
} from "@angular/core";
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { Ng2MdDataTable } from './data-table';

/**
 * Ng2MdDataTable row
 */
export interface INg2TableSelectableRow {
    selectableValue: string;
    onChange: EventEmitter<INg2TableSelectableRowSelectionChange>;
    isActive: boolean;
    change: (event: any) => void;
    ngAfterContentInit: () => void;
}

/**
 * Selectable change event data
 */
export interface INg2TableSelectableRowSelectionChange {
    name?: string;
    target: INg2TableSelectableRow;
    isActive: boolean;
    selectableValue: string;
}

export abstract class AbstractNg2MdDataTableSelectableRow implements AfterContentInit, INg2TableSelectableRow {
    @Input() selectableValue: string;
    @Input() showCheckbox: boolean = true;
    // @TODO: enable indeterminate to selectAll
    // @Input() indeterminate: boolean = false;
    @Input() selectOnClick: boolean = true;
    @Output() onChange: EventEmitter<INg2TableSelectableRowSelectionChange> = new EventEmitter(false);
    isAllActive: boolean = false;
    isActive: boolean = false;

    constructor(
        @Optional()
        @Inject(forwardRef(() => Ng2MdDataTable))
        public table: Ng2MdDataTable, protected _element: ElementRef
    ) {
        (this.onChange as any).share();
    }

    /**
     * Change active status
     */
    change(event: Event, selectAll = false) {

        // @TODO: enable indeterminate to selectAll
        this.isActive = !this.isActive;

        const changeEvent: INg2TableSelectableRowSelectionChange = {
            name: 'selectable_row_change',
            target: this,
            isActive: this.isActive,
            selectableValue: this.selectableValue
        };
        this.onChange.emit(changeEvent);
    }

    ngAfterContentInit() {
    }
}

@Component({
    selector: 'tr[ng2-md-data-table-header-selectable-row]',
    template: `
        <th *ngIf="showCheckbox" class="md-data-check-cell">
            <md-checkbox (change)="change($event)" [checked]="isAllActive"></md-checkbox>
        </th>
        <ng-content></ng-content>
    `,
    host: {
        '[class.active]': 'isAllActive'
    }
})
export class Ng2MdDataTableHeaderSelectableRow extends AbstractNg2MdDataTableSelectableRow {
    constructor(
        @Optional()
        @Inject(forwardRef(() => Ng2MdDataTable))
        public table: Ng2MdDataTable, protected _element: ElementRef
    ) {
        super(table, _element);
    }

    _bindListener(): void {
        this.table.onSelectableChange
            .map(event => event.allSelected)
            .subscribe(newActiveStatus => this.isActive = newActiveStatus);
    }

    ngAfterContentInit() {
        if (!!this.table) {
            this._bindListener();
        }
    }
}

@Component({
    selector: 'tr[ng2-md-data-table-selectable-row]',
    template: `
        <td *ngIf="showCheckbox" class="md-data-check-cell">
            <md-checkbox (change)="change($event)" [checked]="isActive"></md-checkbox>
        </td>
        <ng-content></ng-content>
    `,
    host: {
        '[class.active]': 'isActive'

    }
})
export class Ng2MdDataTableSelectableRow extends AbstractNg2MdDataTableSelectableRow {
    constructor(
        @Optional()
        @Inject(forwardRef(() => Ng2MdDataTable))
        public table: Ng2MdDataTable, protected _element: ElementRef
    ) {
        super(table, _element);
    }

    /**
     * @param {any} element
     *
     * @returns {string}
     */
    _getIndex(element: any): string {
        return Array.prototype.indexOf.call(element.parentNode.children, element).toString();
    }

    _bindListener(): void {
        this.table.onSelectableChange
            .map(event => {
                return event.values !== undefined &&
                    event.values.length &&
                    (event.values.findIndex((value: string) => value === this.selectableValue)) !== -1;
            })
            .subscribe(newActiveStatus => this.isActive = newActiveStatus);
    }

    ngAfterContentInit() {
        let element = this._element.nativeElement;
        if (this.selectableValue === undefined) {
            this.selectableValue = this._getIndex(element);
        }

        if (!!this.table) {
            this._bindListener();
        }
    }
}
