import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('appVideo') videoRef!: ElementRef<HTMLVideoElement>;
  ngAfterViewInit(): void {
    const video = this.videoRef.nativeElement;
    const listItems = document.querySelectorAll<HTMLLIElement>('.list-group-item');

    if (!video) return;

    // Play first video
    video.src = 'assets/CustomerApp/1.mp4';
    video.load();
    video.play().catch(err => console.warn('Autoplay blocked:', err));

    // Handle list clicks
    listItems.forEach(item => {
      item.addEventListener('click', () => {
        listItems.forEach(li => li.classList.remove('active'));
        item.classList.add('active');

        const newSrc = item.getAttribute('data-video');
        if (!newSrc) return;

        // Only change if different
        if (!video.src.includes(newSrc)) {
          video.pause();
          video.src = newSrc;  // relative path is fine
          video.load();
        }
        video.currentTime = 0;
        video.play().catch(err => console.warn('Play blocked:', err));
      });
    });
  }

  // ngAfterViewInit(): void {
  //   const video = this.videoRef.nativeElement;
  //   const listItems = document.querySelectorAll<HTMLLIElement>('.list-group-item');

  //   if (!video) return;

  //   // Play first video
  //   video.src = '/assets/CustomerApp/1.mp4';
  //   video.load();
  //   video.play().catch(err => console.warn('Autoplay blocked:', err));

  //   // Handle list clicks
  //   listItems.forEach(item => {
  //     item.addEventListener('click', () => {
  //       listItems.forEach(li => li.classList.remove('active'));
  //       item.classList.add('active');

  //       const newSrc = item.getAttribute('data-video');
  //       if (!newSrc) return;

  //       // Change video source safely
  //       if (video.src.endsWith(newSrc)) {
  //         video.currentTime = 0;
  //         video.play();
  //         return;
  //       }

  //       video.pause();
  //       video.src = `/${newSrc.replace(/^\/+/, '')}`;
  //       video.load();
  //       video.onloadedmetadata = () => video.play();
  //     });
  //   });
  // }
}
