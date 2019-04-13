import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";

import "@polymer/iron-flex-layout/iron-flex-layout";
import "@polymer/iron-icon/iron-icon";
import "@polymer/iron-icons/iron-icons";

import "@polymer/paper-icon-button/paper-icon-button";
import "@polymer/paper-card/paper-card";
import "@polymer/paper-checkbox/paper-checkbox";
import "@polymer/paper-input/paper-input";

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
          --paper-input-container-focus-color: #cbba83;
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
          <paper-input class="location__input" label="Type your location">
            <paper-icon-button
              class="location__button"
              disabled$="[[_noLocationSet]]"
              icon="icons:arrow-forward"
              on-tap="_handleLocationSubmit"
              slot="suffix"
            ></paper-icon-button>
          </paper-input>
          <paper-checkbox checked class="location__checkbox"
            >remember me</paper-checkbox
          >
        </div>
      </paper-card>
    `;
  }
  static get properties() {
    return {
      _noLocationSet: {
        type: Boolean,
        value: true
      }
    };
  }

  /**
   * Handle Location Submit
   * @param {objext} event
   */
  _handleLocationSubmit(event) {
    console.log(event);
  }
}

window.customElements.define("next-meal-app", NextMealApp);
