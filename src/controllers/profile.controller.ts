import { NextFunction, Request, Response } from 'express';
import { CreateProfileDto } from '@/dtos/profile.dto';
import { Profile } from '@/interfaces/profile.interface';
import ProfileService from '@/services/profile.service';

class ProfileController {
  public profileService = new ProfileService();

  public getProfiles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllProfilesData: Profile[] = await this.profileService.findAllProfiles();
      res.status(200).json({ data: findAllProfilesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getProfileById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const profileId: string = req.params.id;
      const findOneProfileData: Profile = await this.profileService.findByProfileID(profileId);
      res.status(200).json({ data: findOneProfileData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const profileData: CreateProfileDto = req.body;
      console.log('Profile Data: ', profileData);
      const createProfileData: Profile = await this.profileService.createProfile(profileData);
      res.status(201).json({ data: createProfileData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const profileId: string = req.params.id;
      const profileData: CreateProfileDto = req.body;
      const updateProfileData: Profile = await this.profileService.updateProfile(profileId, profileData);
      res.status(200).json({ data: updateProfileData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const profileId: string = req.params.id;
      const deleteProfileData: Profile = await this.profileService.deleteProfile(profileId);
      res.status(200).json({ data: deleteProfileData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ProfileController;
