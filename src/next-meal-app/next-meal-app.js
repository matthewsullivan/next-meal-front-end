import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

import '@collaborne/paper-chip/paper-chip';

import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-pages/iron-pages';

import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-card/paper-card';
import '@polymer/paper-checkbox/paper-checkbox';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-slider/paper-slider';
import '@polymer/paper-toast/paper-toast';

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

        .location,
        .filter {
          background: #ffffe5;
          width: calc(100% - 16px);
        }

        .filter__header {
          @apply --layout-horizontal;
          @apply --layout-justified;
        }

        .filter__body {
          margin: 10px 0;
        }

        .title {
          color: var(--app-tertiary-color);
          margin: 8px 0;
        }

        .subtitle {
          color: var(--app-tertiary-color);
          margin: 8px 0;
        }

        .tags,
        .radius {
          margin: 32px 0;
        }

        .radius__slider {
          width: 100%;
          --paper-slider-active-color: var(--app-tertiary-color);
          --paper-slider-container-color: var(--app-secondary-color);
          --paper-slider-knob-color: var(--app-tertiary-color);
          --paper-slider-pin-color: var(--app-tertiary-color);
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

        .button--next {
          margin-right: -12px;
        }

        .button--back {
          margin-left: -12px;
        }

        .toast {
          height: 64px;
          overflow-x: scroll;
          --paper-toast-background-color: var(--app-primary-color);
          @apply --layout-horizontal;
        }

        .chip {
          margin: 8px 0 0 0;
        }

        .chip--toast {
          margin: 0 8px 0 0;
          @apply --layout-horizontal;
        }

        .chip__button {
          bottom: 4px;
          left: 8px;
        }

        @media only screen and (min-width: 640px) {
          .location,
          .filter {
            width: 40%;
          }
        }
      </style>

      <iron-pages
        attr-for-selected="step-name"
        class="pages"
        id="pages"
        selected="location"
      >
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
              <paper-checkbox
                checked
                class="location__checkbox"
                id="rememberMe"
              >
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

        <paper-card class="filter" step-name="filters">
          <div class="card-content">
            <div class="filter__header">
              <paper-icon-button
                class="button button--back"
                icon="icons:arrow-back"
                on-tap="_handleFilterBack"
              ></paper-icon-button>
              <p class="filter__body">Searching near [[user.search]]</p>
            </div>
            <div class="tags">
              <h3 class="subtitle">Tags</h3>
              <dom-repeat items="{{chips}}">
                <template>
                  <paper-chip
                    class="chip"
                    data-chip$="{{item}}"
                    on-tap="_handleChipSelection"
                    selectable
                  >
                    {{item}}
                  </paper-chip>
                </template>
              </dom-repeat>
            </div>

            <div class="radius">
              <h3 class="subtitle">Search Radius</h3>
              <paper-slider
                class="radius__slider"
                id="ratings"
                min="10"
                max="100"
                pin
                snaps
                step="5"
                value="50"
              ></paper-slider>
            </div>
          </div>
        </paper-card>
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
      chips: {
        type: Array,
        value: () => ['Fancy', 'Casual', 'Pub', 'Fast Food', '5+ Star'],
      },
      filters: {
        type: Object,
        value: () => {
          return {
            chips: [],
            radius: 0,
          };
        },
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
        type: Object,
        value: () => JSON.parse(localStorage.getItem('user')),
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
   * Handle Chip Selection
   * @param {Object} event
   */
  _handleChipSelection(event) {
    const chip = event.target.getAttribute('data-chip');

    if (this.filters.chips.includes(chip)) {
      return;
    }

    this.push('filters.chips', chip);

    this.$.toast.open();
  }

  /**
   * Handle Filter Back
   */
  _handleFilterBack() {
    this.$.pages.select('location');
  }

  /**
   * Handle Location Submit
   */
  _handleLocationSubmit() {
    this._updateUser(this.user);

    this.$.pages.select('filters');
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

  /**
   * Remove Chip Item
   * @param {Object} event
   */
  _removeChipItem(event) {
    const chip = event.target.parentElement.getAttribute('data-chip');

    if (!this.filters.chips.includes(chip)) {
      return;
    }

    this.splice('filters.chips', this.filters.chips.indexOf(chip), 1);

    if (this.filters.chips.length === 0) {
      this.$.toast.close();
    }
  }
}

window.customElements.define('next-meal-app', NextMealApp);
