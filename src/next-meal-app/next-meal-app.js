import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';

import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-card/paper-card';
import '@polymer/paper-checkbox/paper-checkbox';
import '@polymer/paper-input/paper-input';

import 'paper-input-place';

/**
 * @customElement
 * @polymer
 */
class NextMealApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          background: url(images/background.jpg);
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          border: 8px solid #ffecb3;
          @apply --layout-center;
          @apply --layout-center-justified;
          @apply --layout-fit;
          @apply --layout-vertical;
        }

        .location {
          background: #ffffe5;
          width: calc(100% - 16px);
        }

        .location__title {
          color: #8d8d8d;
        }

        .location__input {
          display: block;
          --paper-input-container-focus-color: #cbba83;
          --paper-input-place-postfix-icon-mixin: {
            display: none;
          }
        }

        .location__actions {
          margin-top: 16px;
          @apply --layout-horizontal;
          @apply --layout-justified;
        }

        .location__checkbox {
          margin-top: 16px;
          --paper-checkbox-checked-color: #cbba83;
        }

        @media only screen and (min-width: 640px) {
          .location {
            width: 40%;
          }
        }
      </style>

      <paper-card class="location">
        <div class="card-content">
          <h2 class="location__title">Discover your Next Meal</h2>
          <paper-input-place
            api-key="AIzaSyDIzP6lts91F_1atFp9Kq0ygMDiGE8cI38"
            class="location__input"
            hide-error
            hide-icon
            label="Type your location"
            value="{{location}}"
          ></paper-input-place>
          <div class="location__actions">
            <paper-checkbox checked class="location__checkbox">
              remember me
            </paper-checkbox>
            <paper-icon-button
              class="location__button"
              disabled$="[[noLocationSet]]"
              icon="icons:arrow-forward"
              on-tap="_handleLocationSubmit"
            ></paper-icon-button>
          </div>
        </div>
      </paper-card>
    `;
  }
  static get properties() {
    return {
      location: {
        type: Object,
        observer: '_locationChanged',
      },
      locationId: String,
      noLocationSet: {
        type: Boolean,
        value: true,
      },
    };
  }

  /**
   * Handle Location Submit
   */
  _handleLocationSubmit() {}

  /**
   * Location Changed
   */
  _locationChanged() {
    if (!this.location.place_id) {
      this.noLocationSet = true;

      return;
    }

    this.locationId = this.location.place_id;
    this.noLocationSet = false;
  }
}

window.customElements.define('next-meal-app', NextMealApp);
