import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryApiService implements InMemoryDbService {

  constructor() { }

  createDb() {

    const authors = [
      { id: 1, name: 'Lev Nikolayevich Tolstoy' },
      { id: 2, name: 'Victor Hugo' },
      { id: 3, name: 'H. G. Wells' },
      { id: 4, name: 'Jules Verne' },
      { id: 5, name: 'Henry Kuttner' },
      { id: 6, name: 'Kenneth Grahame' },
      { id: 7, name: 'Mark Twain' }
    ];

    const books = [
      {
        id: 1,
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich Tolstoy',
        description: '',
        coverImage: 'https://images.gr-assets.com/books/1413215930m/656.jpg',
        goodreadsId: 656,
        read: false
      },
      {
        id: 2,
        title: 'Les Misérables',
        genre: 'Historical Fiction',
        author: 'Victor Hugo',
        description: '',
        coverImage: 'https://images.gr-assets.com/books/1411852091m/24280.jpg',
        goodreadsId: 24280,
        read: false
      },
      {
        id: 3,
        title: 'The Time Machine',
        genre: 'Science Fiction',
        author: 'H. G. Wells',
        description: '',
        coverImage: 'https://images.gr-assets.com/books/1327942880m/2493.jpg',
        goodreadsId: 2493,
        read: false
      },
      {
        id: 4,
        title: 'A Journey into the Center of the Earth',
        genre: 'Science Fiction',
        author: 'Jules Verne',
        description: '',
        coverImage: 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png',
        goodreadsId: 32829,
        read: false
      },
      {
        id: 5,
        title: 'The Dark World',
        genre: 'Fantasy',
        author: 'Henry Kuttner',
        description: '',
        coverImage: 'https://images.gr-assets.com/books/1322680910m/1881716.jpg',
        goodreadsId: 1881716,
        read: false
      },
      {
        id: 6,
        title: 'The Wind in the Willows',
        genre: 'Fantasy',
        author: 'Kenneth Grahame',
        description: '',
        coverImage: 'https://images.gr-assets.com/books/1423183570m/5659.jpg',
        goodreadsId: 5659,
        read: false
      },
      {
        id: 7,
        title: 'Life On The Mississippi',
        genre: 'History',
        author: 'Mark Twain',
        description: '',
        coverImage: 'https://images.gr-assets.com/books/1309286211m/99152.jpg',
        goodreadsId: 99152,
        read: false
      },
      {
        id: 8,
        title: 'Childhood',
        genre: 'Biography',
        author: 'Lev Nikolayevich Tolstoy',
        description: '',
        coverImage: 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png',
        goodreadsId: 2359878,
        read: false
      }
    ];

    return {authors, books};
  }
}
