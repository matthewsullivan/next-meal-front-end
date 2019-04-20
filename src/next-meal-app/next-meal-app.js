import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-pages/iron-pages';

import '@polymer/paper-toast/paper-toast';

import './src/nm-filter';
import './src/nm-location';

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

        .toast {
          height: 64px;
          overflow-x: scroll;
          --paper-toast-background-color: var(--app-primary-color);
          @apply --layout-horizontal;
        }
      </style>

      <iron-pages
        attr-for-selected="step-name"
        class="pages"
        id="pages"
        selected="location"
      >
        <nm-filter step-name="filter"></nm-filter>
        <nm-location step-name="location"></nm-location>
      </iron-pages>

      <paper-toast class="fit-bottom toast" duration="0" id="toast">
        <dom-repeat items="{{filters.chips}}">
          <template is="dom-repeat">
            <paper-chip class="chip chip--toast" data-chip$="{{item}}">
              <div>{{item}}</div>
              <paper-icon-button
                class="chip__button"
                icon="icons:close"
                on-tap="_removeChipItem"
              ></paper-icon-button>
            </paper-chip>
          </template>
        </dom-repeat>
      </paper-toast>
    `;
  }
  static get properties() {
    return {
      user: {
        type: Object,
        value: () => JSON.parse(localStorage.getItem('user')),
      },
    };
  }
}

window.customElements.define('next-meal-app', NextMealApp);
