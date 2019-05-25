import {html, PolymerElement} from '@polymer/polymer/polymer-element';

import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-pages/iron-pages';

import './nm-filter';
import './nm-location';

/**
 * @customElement
 * @polymer
 */
class NextMealApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          background: url(images/background.jpg);
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          border: 8px solid var(--app-primary-color);
          @apply --layout-fit;
          --app-primary-color: #ffecb3;
          --app-secondary-color: #cbba83;
          --app-tertiary-color: #8d8d8d;
        }

        .pages {
          @apply --layout-center;
          @apply --layout-fit;
          @apply --layout-center-justified;
          @apply --layout-vertical;
        }
      </style>

      <iron-pages
        attr-for-selected="step-name"
        class="pages"
        id="pages"
        selected="location"
      >
        <nm-filter step-name="filter" user="{{user}}"></nm-filter>
        <nm-location step-name="location" user="{{user}}"></nm-location>
      </iron-pages>
    `;
  }

  static get properties() {
    return {
      user: {
        notify: true,
        type: Object,
        value: () => JSON.parse(localStorage.getItem('user')),
      },
    };
  }
}

window.customElements.define('next-meal-app', NextMealApp);
