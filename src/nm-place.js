import {html, PolymerElement} from '@polymer/polymer/polymer-element';

import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';

import '@polymer/paper-card/paper-card';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-toast/paper-toast';

import './shared-style';

/**
 * @customElement
 * @polymer
 */
class NextMealPlace extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-style">
        :host {
          display: block;
        }

        .places {
          background: #ffffe5;
          max-height: 80%;
          overflow: scroll;
          top: 10%;
          width: 100%;
        }

        .places__header {
          @apply --layout-horizontal;
          @apply --layout-justified;
        }

        .places__body {
          margin: 10px 0;
        }

        .toast {
          height: 64px;
          overflow-x: scroll;
          --paper-toast-background-color: var(--app-primary-color);
          @apply --layout-horizontal;
        }
      </style>

      <paper-card class="places" step-name="place">
        <div class="card-content">
          <div class="places__header">
            <paper-icon-button
              class="button button--back"
              icon="icons:arrow-back"
              on-tap="_handlePlaceBack"
            ></paper-icon-button>
            <p class="places__body">Searching near [[user.search]]</p>
          </div>

          <template as="place" is="dom-repeat" items="{{places}}">
            <p>[[place.name]]</p>
          </template>
        </div>
      </paper-card>

      <paper-toast
        class="fit-bottom toast"
        duration="0"
        id="toast"
      ></paper-toast>

      <iron-ajax
        content-type="application/json"
        handle-as="json"
        id="ajax"
        on-response="_handleResponse"
        params="[[filters]]"
        url="[[api.origin]]/[[api.path]]/places/"
      ></iron-ajax>
    `;
  }
  static get properties() {
    return {
      api: {
        type: Object,
        value: NextMealGlobals.api,
      },
      app: {
        type: Object,
        value: () => document.querySelector('next-meal-app'),
      },
      filters: {
        notify: true,
        type: Object,
      },
      user: {
        notify: true,
        type: Object,
      },
    };
  }

  /**
   * Request Nearby Places
   * @param {Object} filters
   */
  requestNearbyPlaces(filters) {
    this.filters = Object.assign(this.user, filters);

    this.$.ajax.generateRequest();
  }

  /**
   * Handle Place Back
   */
  _handlePlaceBack() {
    this.app.$.pages.select('filter');
  }

  /**
   * Handle Place Back
   * @param {Object} event
   */
  _handleResponse(event) {
    const response = event.detail.response;

    this.notifyPath('places', response);
  }
}

window.customElements.define('nm-place', NextMealPlace);
