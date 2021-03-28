import { FormBuilder } from '@angular/forms';
import { Bull } from '@cms-interfaces';
import { of } from 'rxjs';
import { AnimalDisplayComponent } from './animal-display.component';

fdescribe('AnimalDisplayComponent', () => {
  let component: AnimalDisplayComponent;
  let mockStore,
    mockScreenService,
    mockAnimalUpdateService,
    mockBreedService,
    mockAnimal,
    mockBull: Bull,
    mockBreed,
    mockControl;

  beforeEach(() => {
    mockBull = {
      breed: 'LIM',
      name: 'dave',
      tagNumber: 'tagNumber',
    };
    mockStore = {
      pipe: () => {
        return of(mockBull);
      },
    };
    mockScreenService = {};
    mockAnimalUpdateService = {
      updateAnimal: () => {},
    };
    mockBreedService = {
      getBreedFromCode: () => {
        return mockBreed;
      },
    };
    mockAnimal = { breed: 'LIM', sire: { tagNumber: 'tagNumber' } };
    mockBreed = 'limousin';
    mockControl = { setValue: () => {} };
    component = new AnimalDisplayComponent(
      mockStore,
      mockScreenService,
      new FormBuilder(),
      mockAnimalUpdateService,
      mockBreedService
    );
  });

  it('Should compile', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit [method]', () => {
    beforeEach(() => {});
    it('track animal changes to update sire', (done) => {
      component.ngOnInit();
      component.$selectedAnimal.next(mockAnimal);
      component.$selectedAnimal.subscribe((animal) => {
        if (animal) {
          component.$sire.subscribe((sire) => {
            expect(sire).toEqual(mockBull);
            done();
          });
        }
      });
    });
  });

  describe('getBreedName [method]', () => {
    it('Should get name of breed from animal', () => {
      expect(component.getBreedName(mockAnimal).toLowerCase()).toEqual(
        mockBreed
      );
    });
  });

  it('should return css class for small screen', () => {
    mockScreenService.isSmallScreen = true;
    expect(component.getCSS()).toEqual('small-screen-display');
  });

  it('should return css class for big screen', () => {
    mockScreenService.isSmallScreen = false;
    expect(component.getCSS()).toEqual('cms-sticky');
  });

  describe('open edit modal [method]', () => {
    let emitSpy;
    beforeEach(() => {
      emitSpy = spyOn(component.editAnimal, 'emit');
      component.$selectedAnimal.next(mockAnimal);
    });

    it('should emit animal', () => {
      component.openEditModal();
      expect(emitSpy).toHaveBeenCalledWith(mockAnimal);
    });
  });

  describe('editNote [method]', () => {
    it('should allow edit notes if false', () => {
      component.isEditNotes = false;
      component.editNotes();
      expect(component.isEditNotes).toBeTrue();
    });

    it('Should update notes if user has made an edit', () => {
      component.ngOnInit();
      let updateNotesSpy = spyOn<any>(
        mockAnimalUpdateService,
        'updateAnimal'
      ).and.returnValue(Promise.resolve());
      component.isEditNotes = true;
      component.hasChangedNotes = true;
      component.editNotes();
      expect(updateNotesSpy).toHaveBeenCalled();
    });

    it('should not call update notes if no changes made', () => {
      let updateNotesSpy = spyOn<any>(component, 'updateNotes');
      component.isEditNotes = true;
      component.hasChangedNotes = false;
      component.editNotes();
      expect(updateNotesSpy).not.toHaveBeenCalled();
    });
  });

  it('Should reset notes if changes canceled', () => {
    component.ngOnInit();
    let mockNotes = 'Some notes';
    let notesControl = component.notesGroup.get('notes');
    notesControl.setValue(mockNotes);

    component.cancelEdit();
    expect(notesControl.value).not.toEqual(mockNotes);
    expect(component.isEditNotes).toBeFalse();
  });

  it('Should return correct css if not editing notes', () => {
    component.isEditNotes = false;
    expect(component.getCSSForNotesEdit()).toEqual('badge-info');
  });

  it('should return correct css if editing notes and no ntoes changes made', () => {
    component.isEditNotes = true;
    component.hasChangedNotes = false;
    expect(component.getCSSForNotesEdit()).toEqual(
      'badge-success cms-disabled-pill cms-notes-edit'
    );
  });

  it('should return correct css if editing notes and notes change made', () => {
    component.isEditNotes = true;
    component.hasChangedNotes = true;
    expect(component.getCSSForNotesEdit()).toEqual(
      'badge-success cms-notes-edit'
    );
  });

  describe('ngOndestroy', () => {
    let unsubscribeSpy;
    beforeEach(() => {
      unsubscribeSpy = spyOn<any>(component['subscriptions'], 'unsubscribe');
    });
    it('should call unsubscribe', () => {
      component.ngOnDestroy();
      expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
    });
  });
});
