import {
  Component,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactformComponent } from '../contactform/contactform.component';
import { OciComponent } from '../oci/oci.component';
import { SubscriptionComponent } from '../subscription/subscription.component';
import { WhyChooseUsComponent } from '../why-choose-us/why-choose-us.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
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
  @ViewChildren('appVideo') videos!: QueryList<ElementRef<HTMLVideoElement>>;

  ngAfterViewInit(): void {
    this.setupLazyVideoPlayback();
  }

  // ================================
  // PRODUCTION SAFE VIDEO HANDLING
  // ================================
  private setupLazyVideoPlayback() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;

          if (entry.isIntersecting) {
            video.muted = true;
            video.playsInline = true;

            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    this.videos.forEach((videoRef) => {
      observer.observe(videoRef.nativeElement);
      this.setupFeatureSwitch(videoRef.nativeElement);
    });
  }

  // ===================================
  // SMOOTH SOURCE SWITCHING
  // ===================================
  private setupFeatureSwitch(video: HTMLVideoElement) {
    const section = video.closest('section');
    if (!section) return;

    const items = section.querySelectorAll<HTMLLIElement>('.list-group-item');

    let currentIndex = 0;

    const playIndex = (index: number) => {
      const src = items[index].dataset['video'];
      if (!src) return;

      items.forEach((li) => li.classList.remove('active'));
      items[index].classList.add('active');

      const source = video.querySelector('source')!;
      if (source.src.includes(src)) return;

      video.pause();
      source.src = src;
      video.load();

      video.onloadeddata = () => {
        video.play().catch(() => {});
      };

      currentIndex = index;
    };

    video.onended = () => {
      playIndex((currentIndex + 1) % items.length);
    };

    items.forEach((item, i) => {
      item.addEventListener('click', () => playIndex(i));
    });

    playIndex(0);
  }
}
