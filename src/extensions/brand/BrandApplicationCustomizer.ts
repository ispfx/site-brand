import { override } from '@microsoft/decorators';
import {
  BaseApplicationCustomizer, PlaceholderName
} from '@microsoft/sp-application-base';
import styles from './BrandApplicationCustomizer.module.scss';
import * as strings from 'BrandApplicationCustomizerStrings';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IBrandApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class BrandApplicationCustomizer
  extends BaseApplicationCustomizer<IBrandApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    this.context.placeholderProvider.changedEvent.add(this, this.top);
    this.context.placeholderProvider.changedEvent.add(this, this.bottom);

    return Promise.resolve();
  }

  private top(): void {
    const placeholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top);
    placeholder.domElement.innerHTML = `
      <header class="${styles.header}">
        <h1 class="${styles.siteTitle}">${this.context.pageContext.web.title}</h1>
      </header>
    `;
  }

  private bottom(): void {
    const placeholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom);
    placeholder.domElement.innerHTML = `
      <footer class="${styles.footer}">
        &copy; 2018 Spiritous
      </footer>
    `;
  }
}
