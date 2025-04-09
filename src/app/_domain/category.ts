export class Category {
    constructor(public id: string, public category: string) {}
}

export type CategoryJson = {
    id: string;
    category: string;
};

export function toCategoryList(jsonList: CategoryJson[]): Map<string, Category[]> {
    if (jsonList) {
        const categories = jsonList.map((category: CategoryJson) => new Category(category.id, category.category));   
        return summarizeByKey(categories, getCategoryKey);    
    }
    return new Map();
}

const summarizeByKey = (array: Category[], keyGetter: (c: Category) => string): Map<string, Category[]> => {
    return array.reduce<Map<string, Category[]>>((result, currentObject) => {
      const value = keyGetter(currentObject);
      if (!result.has(value)) {
        result.set(value, []);
      }
      result.get(value)?.push(currentObject);
      return result;
    }, new Map());
};

function getCategoryKey(category: Category): string {
    const values = category.category.split("/");
    return values[0];
}