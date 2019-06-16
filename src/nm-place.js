import {html, PolymerElement} from '@polymer/polymer/polymer-element';

import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-header-layout/app-header-layout';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects';
import '@polymer/app-layout/app-toolbar/app-toolbar';

import '@polymer/iron-ajax/iron-ajax';
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

        .header {
          background: var(--app-primary-color);
        }

        .places {
          box-sizing: border-box;
          padding: 0 8px;
          width: 100%;
        }

        .preview {
          @apply --layout-horizontal;
          @apply --layout-wrap;
        }

        .preview__place {
          background: var(--app-complementary-color);
          border-radius: 0;
          width: 33%;
          margin-bottom: 8px;
          --paper-card-header-image: {
            height: 200px;
          }
        }

        .back {
          bottom: 24px;
          color: #000;
          left: 24px;
          position: fixed;
          --paper-fab-background: var(--app-primary-color);
          --paper-fab-keyboard-focus-background: var(--app-seconadary-color);
        }
      </style>

      <app-header-layout>
        <app-header class="header" slot="header">
          <app-toolbar>
            <paper-icon-button
              class="button button--back"
              icon="icons:arrow-back"
              on-tap="_handlePlaceBack"
            ></paper-icon-button>
            <div main-title>
              <p>Searching near [[user.search]]</p>
            </div>
          </app-toolbar>
        </app-header>

        <div class="places" step-name="place">
          <template
            as="place"
            class="preview"
            is="dom-repeat"
            items="{{places}}"
          >
            <paper-card
              alt="[[place.name]]"
              class="preview__place"
              image="[[_getBanner(place)]]"
            >
              <div class="card-content">
                <h2>[[place.name]]</h2>
                <p>[[place.vicinity]]</p>
              </div>
            </paper-card>
          </template>
        </div>
      </app-header-layout>

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
      googleApiKey: {
        type: Object,
        value: NextMealGlobals.googleApiKey,
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
   * Get Banner
   * @param {Object} place
   * @return {String}
   */
  _getBanner(place) {
    const dimensions = 'maxwidth=614';
    const path = 'https://maps.googleapis.com/maps/api/place/photo';
    const reference = place.photos[0].photo_reference;
    const url = `${path}?${dimensions}&photoreference=${reference}&key=${
      this.googleApiKey
    }`;

    return url;
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

    console.log(response);

    this.notifyPath('places', response);
  }
}

window.customElements.define('nm-place', NextMealPlace);
