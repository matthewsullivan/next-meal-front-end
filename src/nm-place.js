import {html, PolymerElement} from '@polymer/polymer/polymer-element';

import '@polymer/app-layout/app-header/app-header';
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

        .header__title {
          font-family: Roboto, sans-serif;
          font-size: 16px;
        }

        .places {
          padding: 8px;
        }

        .preview {
          @apply --layout-justified;
          @apply --layout-horizontal;
          @apply --layout-wrap;
        }

        .preview__place {
          background: var(--app-complementary-color);
          border-radius: 0;
          height: 336px;
          width: 100%;
          margin-bottom: 8px;
          --paper-card-header-image: {
            height: 200px;
          }
        }

        .preview__content {
          padding: 8px;
        }

        .preview__title {
          font-size: 16px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .back {
          bottom: 24px;
          color: #000;
          left: 24px;
          position: fixed;
          --paper-fab-background: var(--app-primary-color);
          --paper-fab-keyboard-focus-background: var(--app-seconadary-color);
        }

        @media only screen and (min-width: 640px) {
          .preview__place {
            width: 33%;
          }
        }
      </style>

      <app-header class="header">
        <app-toolbar>
          <paper-icon-button
            class="button button--back"
            icon="icons:arrow-back"
            on-tap="_handlePlaceBack"
          ></paper-icon-button>

          <div class="header__title" main-title>
            Searching near [[user.search]]
          </div>
        </app-toolbar>
      </app-header>

      <div class="places" step-name="place">
        <div class="preview">
          <template as="place" is="dom-repeat" items="{{places}}">
            <paper-card
              alt="[[place.name]]"
              class="preview__place"
              image="[[_getBanner(place)]]"
            >
              <div class="preview__content">
                <h2 class="preview__title">[[place.name]]</h2>
                <p>[[place.vicinity]]</p>
              </div>
            </paper-card>
          </template>
        </div>
      </div>

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
   * Handle Place Response
   * @param {Object} event
   */
  _handleResponse(event) {
    const response = event.detail.response;

    this.notifyPath('places', response);
  }
}

window.customElements.define('nm-place', NextMealPlace);
