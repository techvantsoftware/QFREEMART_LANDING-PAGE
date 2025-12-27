import {
  Component,
  AfterViewInit,
  ViewChildren,
  ViewChild,
  QueryList,
  ElementRef,
  ChangeDetectorRef, // Import this
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
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
      document.body.addEventListener(
        'click',
        () => {
          ociVideo.play().catch(() => {});
        },
        { once: true }
      );
    });
  }

  // ===================================
  // UPDATED: AUTO-ROTATION (LOOP BACK TO START)
  // ===================================
  private initSectionVideos() {
    const sections = document.querySelectorAll<HTMLElement>(
      'section.qfreemart-section'
    );
    const videoElements = this.videoRefs.toArray();

    sections.forEach((section, sectionIndex) => {
      const video = videoElements[sectionIndex]?.nativeElement;
      const listItems =
        section.querySelectorAll<HTMLLIElement>('.list-group-item');

      if (!video || listItems.length === 0) return;

      // Ensure autoplay compatibility
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.loop = false;

      let currentIndex = 0;

      const playIndex = (index: number) => {
        listItems.forEach((li) => li.classList.remove('active'));
        listItems[index].classList.add('active');

        currentIndex = index;
        const src = listItems[index].dataset['video'];
        if (!src) return;

        this.switchVideoInstant(video, src, sectionIndex);
      };

      // Auto-rotate when video ends
      video.onended = () => {
        const next = (currentIndex + 1) % listItems.length;
        playIndex(next);
      };

      // Manual click
      listItems.forEach((item, index) => {
        item.addEventListener('click', () => playIndex(index));
      });

      // Start first video
      playIndex(0);
    });
  }

  // =========================
  // SAFE SWITCH LOGIC
  // =========================
  private switchVideoInstant(
    video: HTMLVideoElement,
    src: string,
    index: number
  ) {
    this.loading[index] = true;
    this.cdr.detectChanges();

    // Stop everything cleanly
    video.pause();
    video.currentTime = 0;

    // Remove old listeners
    video.oncanplay = null;

    // Set source
    video.src = src;
    video.load();

    // 🔥 KEY FIX: wait for canplay
    video.oncanplay = async () => {
      this.loading[index] = false;
      this.cdr.detectChanges();

      try {
        await video.play();
      } catch (e) {
        console.warn('Play blocked, retrying on user gesture');
      }
    };
  }
}
