import {
  Component,
  AfterViewInit,
  ViewChildren,
  ViewChild,
  QueryList,
  ElementRef
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

  ngAfterViewInit(): void {
    this.initOCIVideo();
    this.initSectionVideos();
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

    ociVideo.load();

    ociVideo.play().catch(() => {
      document.body.addEventListener('click', () => {
        ociVideo.play().catch(() => {});
      }, { once: true });
    });
  }

  // ===================================
  // FIXED: SECTION VIDEO HANDLER
  // ===================================
  private initSectionVideos() {
    const sections = document.querySelectorAll<HTMLElement>('section.qfreemart-section');

    sections.forEach((section, index) => {
      const videoElement = this.videoRefs.toArray()[index]?.nativeElement;
      const listItems = section.querySelectorAll<HTMLLIElement>('.list-group-item');

      if (!videoElement) return;

      this.loading[index] = true;

      videoElement.addEventListener('playing', () => {
        this.loading[index] = false;
      });

      const firstItem = listItems[0];
      if (firstItem) {
        this.switchVideo(videoElement, firstItem.getAttribute('data-video')!, index);
        firstItem.classList.add('active');
      }

      listItems.forEach(item => {
        item.addEventListener('click', () => {
          listItems.forEach(li => li.classList.remove('active'));
          item.classList.add('active');

          const newSrc = item.getAttribute('data-video');
          if (newSrc) {
            this.switchVideo(videoElement, newSrc, index);
          }
        });
      });
    });
  }

  // =========================
  // FINAL FIX — SAFE SWITCH
  // =========================
  private async switchVideo(video: HTMLVideoElement, src: string, index: number) {
    this.loading[index] = true;

    try {
      await video.pause();  // WAIT before switching
    } catch {}

    video.src = src;
    video.load();

    video.onloadeddata = async () => {
      try {
        await video.play(); // play safely
      } catch {}
      this.loading[index] = false;
    };
  }
}
