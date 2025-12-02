import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-apps',
  standalone: true,
  imports: [],
  templateUrl: './apps.component.html',
  styleUrl: './apps.component.css'
})
export class AppsComponent {
// Reference to all app videos inside sections
  @ViewChildren('appVideo') videoRefs!: QueryList<ElementRef<HTMLVideoElement>>;

  // Reference to the main OCI video
  @ViewChild('ociVideo') ociVideoRef!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    // ===== PLAY MAIN OCI VIDEO =====
    const ociVideo = this.ociVideoRef?.nativeElement;
    if (ociVideo) {
      ociVideo.muted = true;
      ociVideo.autoplay = true;
      ociVideo.playsInline = true;
      ociVideo.load();
      ociVideo.play().catch(err => {
        console.warn('OCI autoplay blocked:', err);
        document.body.addEventListener('click', () => ociVideo.play(), { once: true });
      });
    }

    // ===== HANDLE OTHER SECTION VIDEOS =====
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
          videoElement.muted = true;
          videoElement.autoplay = true;
          videoElement.playsInline = true;
          videoElement.load();

          videoElement.play().catch(err => {
            console.warn('Autoplay blocked:', err);
            document.body.addEventListener('click', () => videoElement.play(), { once: true });
          });

          firstItem.classList.add('active');
        }
      }

      // Handle list item clicks
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
