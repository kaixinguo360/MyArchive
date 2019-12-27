import { ComponentFactory, ComponentFactoryResolver, Injectable, Type } from '@angular/core';

import { TypeInfos } from '../../environments/type-infos';
import { INode } from './file.service';
import { ContentPreview } from '../com/card/card.component';

export interface TypeInfo {
  name: string;
  preview: Type<ContentPreview>;
  icon: string;
  ext?: RegExp;
}

@Injectable({
  providedIn: 'root'
})
export class NodeResolver {

  public resolveCardContentFactory(node: INode): ComponentFactory<any> {
    return this.componentFactoryResolver.resolveComponentFactory(this.resolveTypeInfo(node).preview);
  }

  public resolveTypeInfo(node: INode): TypeInfo {
    if (TypeInfos.has(node.type)) {
      return TypeInfos.get(node.type);
    } else {
      const ext: string = node.name.trim().split('.').pop();
      let typeInfo: TypeInfo;
      TypeInfos.forEach(info => {
        if (!typeInfo && info.ext && info.ext.exec(ext)) {
          typeInfo = info;
        }
      });
      return typeInfo ? typeInfo : TypeInfos.get('default');
    }
  }

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }
}
