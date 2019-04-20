import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';

import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-card/paper-card';
import '@polymer/paper-checkbox/paper-checkbox';
import '@polymer/paper-input/paper-input';

import 'paper-input-place';

import './shared-style';

/**
 * @customElement
 * @polymer
 */
class NextMealLocation extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-style">
        :host {
          display: block;
        }

        .location {
          background: #ffffe5;
          width: 100%;
        }

        .location__input {
          display: block;
          --paper-input-container-focus-color: var(--app-secondary-color);
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
          margin-top: 8px;
          --paper-checkbox-checked-color: var(--app-secondary-color);
        }
      </style>

      <paper-card class="location" step-name="location">
        <div class="card-content">
          <h2 class="title">Discover your Next Meal</h2>
          <paper-input-place
            api-key="AIzaSyDIzP6lts91F_1atFp9Kq0ygMDiGE8cI38"
            class="location__input"
            hide-error
            hide-icon
            label="Type your location"
            value="{{location}}"
          ></paper-input-place>
          <div class="location__actions">
            <paper-checkbox checked class="location__checkbox" id="rememberMe">
              remember me
            </paper-checkbox>
            <paper-icon-button
              class="button button--next"
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
      app: {
        type: Object,
        value: () => document.querySelector('next-meal-app'),
      },
      location: {
        type: Object,
        observer: '_locationChanged',
      },
      noLocationSet: {
        type: Boolean,
        value: true,
      },
      user: {
        notify: true,
        type: Object,
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.user) {
      this._handleLocationSubmit();
    }
  }

  /**
   * Handle Location Submit
   */
  _handleLocationSubmit() {
    this._updateUser(this.user);

    this.app.$.pages.select('filter');
  }

  /**
   * Location Changed
   */
  _locationChanged() {
    if (!this.location.place_id) {
      this.noLocationSet = true;

      return;
    }

    this.noLocationSet = false;
    this.user = {
      location: this.location.place_id,
      search: this.location.search,
    };
  }

  /**
   * Update User
   * @param {Object} user
   */
  _updateUser(user) {
    if (!this.$.rememberMe.checked) {
      return;
    }

    localStorage.setItem('user', JSON.stringify(user));
  }
}

window.customElements.define('nm-location', NextMealLocation);
