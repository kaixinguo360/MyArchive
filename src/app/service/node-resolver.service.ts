import { ComponentFactory, ComponentFactoryResolver, Injectable, Type } from '@angular/core';

import { INode } from './file.service';
import { TypeInfos } from '../../environments/type-infos';
import { ContentPreview } from '../com/content-preview/content-preview';
import { ContentDetail } from '../com/content-detail/content-detail';

export interface TypeInfo {
  name: string;
  preview: Type<ContentPreview>;
  detail: Type<ContentDetail>;
  icon: string;
  ext?: RegExp;
}

@Injectable({
  providedIn: 'root'
})
export class NodeResolver {

  public resolveContentPreviewFactory(node: INode): ComponentFactory<any> {
    return this.componentFactoryResolver.resolveComponentFactory(this.resolveTypeInfo(node).preview);
  }

  public resolveContentDetailFactory(node: INode): ComponentFactory<any> {
    return this.componentFactoryResolver.resolveComponentFactory(this.resolveTypeInfo(node).detail);
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
