import '@polymer/polymer/polymer-element.js';

const documentContainer = document.createElement('template');

documentContainer.innerHTML = `
  <dom-module id="shared-style">
    <template>
      <style>
        .title {
          color: var(--app-tertiary-color);
          margin: 8px 0;
        }

        .subtitle {
          color: var(--app-tertiary-color);
          margin: 8px 0;
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
      </style>
    </template>
  </dom-module>
`;

document.head.appendChild(documentContainer.content);
