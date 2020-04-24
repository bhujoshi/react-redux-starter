export enum ROUTE_TYPE {
  public,
  private,
}
interface ROUTE {
  path: string;
  type: ROUTE_TYPE;
}

// Define all public routes below
export const LOGIN_ROUTE: ROUTE = { path: '/login', type: ROUTE_TYPE.public };

// Define all private routes below
export const DASHBOARD_ROUTE: ROUTE = { path: '/', type: ROUTE_TYPE.private };

export const CHAPTER_ROUTE: ROUTE = {
  path: '/chapters/:batchId/:parentIds/:batchName',
  type: ROUTE_TYPE.private,
};

export const CONCEPT_ROUTE: ROUTE = {
  path: '/concepts/:batchId/:parentIds/:chapterIds/:batchName/:chapterName',
  type: ROUTE_TYPE.private,
};

export const TEST_ROUTE: ROUTE = {
  path:
    '/tests/:batchId/:conceptIds/:conceptName/:isConceptLocked/:batchName/:parentIds/:chapterName',
  type: ROUTE_TYPE.private,
};
