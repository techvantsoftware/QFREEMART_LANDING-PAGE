import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  @ViewChildren('appVideo') videoRefs!: QueryList<ElementRef<HTMLVideoElement>>;

  ngAfterViewInit(): void {
    const sections = document.querySelectorAll<HTMLElement>('section.qfreemart-section');

    sections.forEach((section, index) => {
      const videoElement = this.videoRefs.toArray()[index]?.nativeElement;
      const listItems = section.querySelectorAll<HTMLLIElement>('.list-group-item');

      if (!videoElement) return;

      // Play first video in each section
      const firstItem = listItems[0];
      if (firstItem) {
        const firstVideoSrc = firstItem.getAttribute('data-video');
        if (firstVideoSrc) {
          videoElement.src = firstVideoSrc;
          videoElement.load();
          videoElement.play().catch(err => console.warn('Autoplay blocked:', err));
          firstItem.classList.add('active');
        }
      }

      // Handle item clicks for that section only
      listItems.forEach(item => {
        item.addEventListener('click', () => {
          listItems.forEach(li => li.classList.remove('active'));
          item.classList.add('active');

          const newSrc = item.getAttribute('data-video');
          if (!newSrc) return;

          if (!videoElement.src.includes(newSrc)) {
            videoElement.pause();
            videoElement.src = newSrc;
            videoElement.load();
          }
          videoElement.currentTime = 0;
          videoElement.play().catch(err => console.warn('Play blocked:', err));
        });
      });
    });
  }
}
