import { Injectable, Component } from '@angular/core'
import { Store } from '@ngrx/store';
import { HttpService } from './http.service';
import { UiService } from './ui.service';
import { Http, URLSearchParams } from '@angular/http';
import * as fromRoot from '../reducers';
import * as tag from '../actions/tag.action';
import { Tag } from '../models/aggregate/tag.model';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

@Injectable()
export class TagService {

    tag: Observable<Tag[]>;
    constructor(
        private http: HttpService,
        private store: Store<fromRoot.State>
    ) {
        this.tag = store.let(fromRoot.getTagEntities);
    }

    public removeTag(oldTag: Tag) {
        this.store.dispatch(new tag.RemoveTagAction(oldTag));
    }

    public removeAllTags() {
        this.store.dispatch(new tag.RemoveAllTagsAction(undefined));
    }

    public addTag(newTag: Tag) {
        this.store.dispatch(new tag.AddTagAction(newTag));
    }
}