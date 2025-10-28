import {
  Component,
  AfterViewInit,
  ViewChildren,
  ElementRef,
  QueryList,
} from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChildren('appVideo') videoRefs!: QueryList<ElementRef<HTMLVideoElement>>;

  ngAfterViewInit(): void {
    // --- (1) Play main OCI video ---
    const ociVideo = document.getElementById('backgroundVideo') as HTMLVideoElement;
    if (ociVideo) {
      ociVideo.play().catch((err) =>
        console.warn('OCI autoplay blocked:', err)
      );
    }

    // --- (2) Handle Qfreemart app videos ---
    const sections = document.querySelectorAll<HTMLElement>('section.qfreemart-section');

    sections.forEach((section, index) => {
      const videoElement = this.videoRefs.toArray()[index]?.nativeElement;
      const listItems = section.querySelectorAll<HTMLLIElement>('.list-group-item');

      if (!videoElement) return;

      // ✅ Play first video by default
      const firstItem = listItems[0];
      if (firstItem) {
        const firstVideoSrc = firstItem.getAttribute('data-video');
        if (firstVideoSrc) {
          videoElement.src = firstVideoSrc;
          videoElement.load();
          videoElement.play().catch((err) =>
            console.warn('Section autoplay blocked:', err)
          );
          firstItem.classList.add('active');
        }
      }

      // ✅ Handle clicks for switching video
      listItems.forEach((item) => {
        item.addEventListener('click', () => {
          listItems.forEach((li) => li.classList.remove('active'));
          item.classList.add('active');

          const newSrc = item.getAttribute('data-video');
          if (!newSrc) return;

          if (!videoElement.src.includes(newSrc)) {
            videoElement.pause();
            videoElement.src = newSrc;
            videoElement.load();
          }

          videoElement.currentTime = 0;
          videoElement.play().catch((err) =>
            console.warn('Play blocked:', err)
          );
        });
      });
    });
  }
}
