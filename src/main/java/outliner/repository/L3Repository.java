package outliner.repository;

import org.springframework.stereotype.Repository;

import outliner.advanced.core.data.OutlinerRepository;
import outliner.domain.L3;


/**
 * Spring Data  repository for the L3 entity.
 */
@Repository
public interface L3Repository extends OutlinerRepository<L3, Long> {

}
