import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'kidz-choice',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './kidz-choice.html',
    styleUrls: ['./kidz-choice.css']
})
export class KidzChoice {

    @ViewChild('gridContainer') gridContainer!: ElementRef;
    colors: string[] = [];
    defaultColor = '#3498db';
    hoverColor = '#e74c3c';
    hoverIndex: number | null = null;

    ngAfterViewInit() {
        this.updateGridSize();
    }

    @HostListener('window:resize')
    onResize() {
        this.updateGridSize();
    }

    updateGridSize() {
        if (this.gridContainer) {
            const containerWidth = this.gridContainer.nativeElement.clientWidth;
            const containerHeight = this.gridContainer.nativeElement.clientHeight;
            const cols = Math.max(1, Math.floor(containerWidth / 110));
            const rows = Math.max(1, Math.floor(containerHeight / 110));
            const gridSize = cols * rows;
            this.colors = Array(gridSize).fill(this.defaultColor);
        }
    }

    changeColors(index: number) {
        this.hoverIndex = index;
        this.colors[index] = this.hoverColor;
    }

    resetColors(index: number) {
        this.hoverIndex = index;
        this.colors[index] = this.defaultColor;
    }

    getOpacity(index: number): number {
        if (this.hoverIndex === null) return 1;

        // Calculate row distance from the hovered index
        const cols = Math.floor(this.gridContainer.nativeElement.clientWidth / 110);
        const hoverRow = Math.floor(this.hoverIndex / cols);
        const currentRow = Math.floor(index / cols);
        const rowDistance = Math.abs(currentRow - hoverRow);

        // Fade out rows behind the hover point
        return Math.max(0.3, 1 - rowDistance * 0.2);
    }
}
