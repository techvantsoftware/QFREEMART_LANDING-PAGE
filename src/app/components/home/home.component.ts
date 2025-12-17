import {
  Component,
  AfterViewInit,
  ViewChildren,
  ViewChild,
  QueryList,
  ElementRef,
  ChangeDetectorRef // Import this
} from '@angular/core';
import { ContactformComponent } from '../contactform/contactform.component';
import { OciComponent } from '../oci/oci.component';
import { SubscriptionComponent } from '../subscription/subscription.component';
import { WhyChooseUsComponent } from '../why-choose-us/why-choose-us.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    OciComponent,
    SubscriptionComponent,
    ContactformComponent,
    WhyChooseUsComponent,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  @ViewChildren('appVideo') videoRefs!: QueryList<ElementRef<HTMLVideoElement>>;
  @ViewChild('ociVideo') ociVideoRef!: ElementRef<HTMLVideoElement>;

  loading: boolean[] = [];

  // Inject ChangeDetectorRef to handle UI updates smoothly
  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.initOCIVideo();
    this.initSectionVideos();
    this.cdr.detectChanges(); // Apply changes immediately
  }

  // =========================
  // FIXED MAIN HERO VIDEO
  // =========================
  private initOCIVideo() {
    const ociVideo = this.ociVideoRef?.nativeElement;
    if (!ociVideo) return;

    ociVideo.muted = true;
    ociVideo.autoplay = true;
    ociVideo.playsInline = true;
    ociVideo.loop = true; // Hero video loops itself

    ociVideo.load();

    ociVideo.play().catch(() => {
      document.body.addEventListener('click', () => {
        ociVideo.play().catch(() => {});
      }, { once: true });
    });
  }

  // ===================================
  // UPDATED: AUTO-ROTATION (LOOP BACK TO START)
  // ===================================
  private initSectionVideos() {
    const sections = document.querySelectorAll<HTMLElement>('section.qfreemart-section');
    const videoElements = this.videoRefs.toArray();

    sections.forEach((section, sectionIndex) => {
      const videoElement = videoElements[sectionIndex]?.nativeElement;
      const listItems = section.querySelectorAll<HTMLLIElement>('.list-group-item');

      if (!videoElement || listItems.length === 0) return;

      // Initialize loading state
      this.loading[sectionIndex] = false;

      // CRITICAL: Disable video-level loop so 'ended' event fires
      videoElement.loop = false; 

      let currentItemIndex = 0;

      // --- 1. Define Play Function ---
      const playIndex = (index: number) => {
        // Update Visuals (Active Class)
        listItems.forEach(li => li.classList.remove('active'));
        listItems[index].classList.add('active');

        // Update State
        currentItemIndex = index;

        // Play Video
        const src = listItems[index].getAttribute('data-video');
        if (src) {
          this.switchVideo(videoElement, src, sectionIndex);
        }
      };

      // --- 2. Event: Video Ends (Logic to Restart) ---
      // We use 'onended' to ensure we don't stack multiple listeners if this runs twice
      videoElement.onended = () => {
        // Calculate the next index
        let nextIndex = currentItemIndex + 1;

        // LOGIC: If we reached the end, go back to 0 (First video)
        if (nextIndex >= listItems.length) {
          nextIndex = 0; 
        }

        console.log(`Section ${sectionIndex}: Video ended. Playing index ${nextIndex}`);
        playIndex(nextIndex);
      };

      // --- 3. Event: Manual Click ---
      listItems.forEach((item, index) => {
        item.addEventListener('click', () => {
          playIndex(index);
        });
      });

      // --- 4. Start Flow ---
      playIndex(0);
    });
  }

  // =========================
  // SAFE SWITCH LOGIC
  // =========================
  private switchVideo(video: HTMLVideoElement, src: string, index: number) {
    // 1. Show Loading
    this.loading[index] = true;
    this.cdr.detectChanges(); // Force UI update

    // 2. Pause current
    video.pause();

    // 3. Set up listener for when data is ready
    // We use 'onloadeddata' property to avoid stacking listeners
    video.onloadeddata = async () => {
      // Hide Loading
      this.loading[index] = false;
      this.cdr.detectChanges();

      // Attempt Play
      try {
        await video.play();
      } catch (err) {
        console.warn('Autoplay prevented:', err);
      }
    };

    // 4. Change Source and Load
    video.src = src;
    video.load();
  }
}