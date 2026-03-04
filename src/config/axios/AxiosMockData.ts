// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { type AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import { setupAuthMock } from './mock/authMock';
import { setupCocktailMock } from './mock/cocktailMock';
import { setupSpiritMock } from './mock/spiritMock';
import { setupToolMock } from './mock/toolMock';
import { setupTechniqueMock } from './mock/techniqueMock';
import { setupGlasswareMock } from './mock/glasswareMock';
import { setupIngredientsMock } from './mock/ingredientsMock';

export function setupMock(api: AxiosInstance): void {
  const mock = new MockAdapter(api, { delayResponse: 1000 });

  setupAuthMock(mock);
  setupCocktailMock(mock);
  setupSpiritMock(mock);
  setupToolMock(mock);
  setupTechniqueMock(mock);
  setupGlasswareMock(mock);
  setupIngredientsMock(mock);
}
