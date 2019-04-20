import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

import '@collaborne/paper-chip/paper-chip';

import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';

import '@polymer/paper-card/paper-card';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-slider/paper-slider';
import '@polymer/paper-toast/paper-toast';

import './shared-style';
/**
 * @customElement
 * @polymer
 */
class NextMealFilter extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-style">
        :host {
          display: block;
        }

        .filter {
          background: #ffffe5;
          width: 100%;
        }

        .filter__header {
          @apply --layout-horizontal;
          @apply --layout-justified;
        }

        .filter__body {
          margin: 10px 0;
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

        .toast {
          height: 64px;
          overflow-x: scroll;
          --paper-toast-background-color: var(--app-primary-color);
          @apply --layout-horizontal;
        }
      </style>

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
      app: {
        type: Object,
        value: () => document.querySelector('next-meal-app'),
      },
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
      user: {
        notify: true,
        type: Object,
      },
    };
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
    this.app.$.pages.select('location');
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

window.customElements.define('nm-filter', NextMealFilter);
