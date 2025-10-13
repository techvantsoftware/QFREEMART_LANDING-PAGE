import { Component, AfterViewInit } from '@angular/core';
interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const playButton = document.getElementById('playButton') as HTMLButtonElement;
    const videoContainer = document.getElementById('videoContainer') as HTMLDivElement;
    const heroOverlay = document.getElementById('heroOverlay') as HTMLDivElement;
    const video = document.getElementById('backgroundVideo') as HTMLVideoElement;

    playButton?.addEventListener('click', () => {
      // Hide overlay and play button
      // heroOverlay.style.display = 'none';
      // Show video container
      videoContainer.style.display = 'block';
      // Play the video
      video.play();
    });
  }
  faqs: FaqItem[] = [
    { question: 'What is Qtreemart?', answer: 'Qtreemart is an all-in-one e-commerce platform that connects customers, sellers, and delivery partners on a single app. It makes shopping, selling, and delivering simple, fast, and secure. <a href="#">Read More</a>', isOpen: true },
    { question: 'How does Qtreemart work?', answer: 'Content for How does Qtreemart work?', isOpen: false },
    { question: 'Which services are available on Qtreemart?', answer: 'Content for Which services are available on Qtreemart?', isOpen: false },
    { question: 'How do I download the Qtreemart app?', answer: 'Content for How do I download the Qtreemart app?', isOpen: false },
    { question: 'Is Qtreemart available in my city?', answer: 'Content for Is Qtreemart available in my city?', isOpen: false },
  ];

  toggleAccordion(item: FaqItem): void {
    item.isOpen = !item.isOpen;
  }

  // For sidebar navigation (optional, could filter FAQs or scroll)
  activeSidebarItem: string = 'General';
  selectSidebarItem(item: string): void {
    this.activeSidebarItem = item;
    // Logic to filter FAQs or scroll to a section
  }

}
